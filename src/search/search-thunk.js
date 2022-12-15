import {createAsyncThunk} from "@reduxjs/toolkit";
import {searchWiki, getPage} from "./search-service";

export const searchWikiThunk = createAsyncThunk(
    'search',
    async (terms) => await searchWiki(terms)
)

export const getPageThunk = createAsyncThunk(
    'getPage',
    async (typingId) => await getPage(typingId)
)
