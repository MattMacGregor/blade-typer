import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./toTypeService"

// use https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_random__format_

export const getRandomThunk = createAsyncThunk(
    'toType/getRandom',
    async () => await service.getRandom()
)

export const getOnThisDayThunk = createAsyncThunk(
    'toType/getOnThisDay',
    async (type) => await service.getOnThisDay(type)
)

export const getFromSearchThunk = createAsyncThunk(
    'toType/getFromSearch',
    async (query) => await service.getFromSearch(query)
)
