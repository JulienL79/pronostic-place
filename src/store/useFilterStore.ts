import { create } from "zustand";

interface IFilterState {
    filterResult: Date | null,
    pronosticRecentFilter: Date | null,
    pronosticStartDate: Date | null,
    pronosticEndDate: Date | null,
    setFilterResult: (newDate: Date) => void,
    setPronosticRecentFilter: (newDate: Date) => void,
    setPronosticStartDate: (newDate: Date) => void,
    setPronosticEndDate: (newDate: Date) => void,
    resetFilters: () => void
}

export const useFilterStore = create<IFilterState>((set) => ({
    filterResult: null,
    pronosticRecentFilter: null,
    pronosticStartDate: null,
    pronosticEndDate: null,
    setFilterResult: (newDate) => {
        set({filterResult : newDate})
    },
    setPronosticRecentFilter: (newDate) => {
        set({pronosticRecentFilter : newDate})
    },
    setPronosticStartDate: (newDate) => {
        set({pronosticStartDate : newDate})
    },
    setPronosticEndDate: (newDate) => {
        set({pronosticEndDate : newDate})
    },
    resetFilters: () => {
        set({
            filterResult : null,
            pronosticRecentFilter : null,
            pronosticStartDate : null,
            pronosticEndDate : null
        })
    }
}))