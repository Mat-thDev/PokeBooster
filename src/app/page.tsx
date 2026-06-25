"use client"

import CollectionCover from "@/components/CollectionCover";
import { pokemonTcg } from "@/services/pokemontcg";
import { SetList, SetResumeModel } from "@tcgdex/sdk";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [avaliableSets, setAvaliableSets] = useState<SetList>([]);
  const [search, setSearch] = useState("");
  const [series, setSeries] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      const sets = await pokemonTcg.getAllSets();
      if (sets) setAvaliableSets(sets);
    };
    load();
  }, []);

  // séries únicas
  const seriesList = useMemo(() => {
    const unique = new Set(avaliableSets.map(s => s.name).filter(Boolean));
    return ["all", ...Array.from(unique)];
  }, [avaliableSets]);

  // filtro + busca
  const filteredSets = useMemo(() => {
    return avaliableSets.filter((set) => {
      const matchesSearch =
        set.name.toLowerCase().includes(search.toLowerCase()) ||
        set.id.toLowerCase().includes(search.toLowerCase());

      const matchesSeries =
        series === "all" || set.name === series;

      return matchesSearch && matchesSeries;
    });
  }, [avaliableSets, search, series]);

  // paginação
  const totalPages = Math.ceil(filteredSets.length / ITEMS_PER_PAGE);

  const paginatedSets = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredSets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSets, page]);


  return (
    <div className="space-y-8 py-4">

      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Selecione um Booster
        </h1>
        <p className="text-base-content/70 text-sm">
          Escolha uma coleção do Pokémon TCG e teste sua sorte.
        </p>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar coleção..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border-2 rounded-md p-2 border-base-300 hover:border-accent active:border-accent transition-colors"
        />

        {/* Sets */}
        <select
          value={series}
          onChange={(e) => {
            setSeries(e.target.value);
            setPage(1);
          }}
          className="border-2 rounded-md p-2 border-base-300 hover:border-accent active:border-accent transition-colors"
        >
          {seriesList.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Todas séries" : s}
            </option>
          ))}
        </select>
      </section>

      <hr className="border-base-content/10" />

      {/* Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedSets.map((set) => (
          <CollectionCover key={set.id} set={set as SetResumeModel} />
        ))}
      </section>

      {/* Estado vazio */}
      {filteredSets.length === 0 && (
        <div className="text-center text-sm text-base-content/80 font-semibold py-10">
          Nenhuma coleção encontrada.
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <section className="flex justify-center items-center gap-2 pt-4">

          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="btn btn-sm"
            disabled={page === 1}
          >
            ←
          </button>

          <span className="text-sm text-base-content/70">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="btn btn-sm"
            disabled={page === totalPages}
          >
            →
          </button>

        </section>
      )}
    </div>
  );
}