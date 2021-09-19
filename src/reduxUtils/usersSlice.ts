import {
  baseUrl,
  headers,
  getMethod,
  postMethod,
  deleteMethod
} from '../utils/api';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';

export type User = {
  id: number;
  Job?: string;
  City?: string;
  Name?: string;
  Email?: string;
  DateCreated?: string;
  PhoneNumber?: string;
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (_, { rejectWithValue }) => {
    const response = await fetch(baseUrl, {
      method: getMethod,
      headers: headers,
      mode: 'cors'
    });
    let data = await response.json().then((data) => {
      if (response.status === 200) return data;
      else return rejectWithValue(data);
    });
    return data;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: User, { rejectWithValue }) => {
    const response = await fetch(baseUrl, {
      method: postMethod,
      headers: headers,
      body: JSON.stringify(user),
      mode: 'cors'
    });
    let data = await response.json().then((data) => {
      if (response.status === 200) return data;
      else return rejectWithValue(data);
    });
    return data;
  }
);

export const filterByJob = createAsyncThunk(
  'user/byName',
  async (job: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}?Job=${job}`, {
        method: getMethod,
        headers: headers,
        mode: 'cors'
      });
      let data = await response.json().then((data) => {
        if (response.status === 200) return data;
        else return rejectWithValue(data);
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: deleteMethod,
        headers: headers,
        mode: 'cors'
      });
      if (response.status === 200) return id;
      else return rejectWithValue(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id - 1
});

const initialState = usersAdapter.getInitialState({ isLoading: false });

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersAddOne: usersAdapter.addOne,
    usersAddMany: usersAdapter.addMany,
    usersRemoveOne: usersAdapter.removeOne
  },
  extraReducers: {
    [fetchUsers.pending.toString()](state) {
      state.isLoading = true;
    },
    [fetchUsers.rejected.toString()](state) {
      state.isLoading = false;
    },
    [fetchUsers.fulfilled.toString()](state, { payload }) {
      state.isLoading = false;
      usersAdapter.addMany(state, payload);
    },
    [addUser.pending.toString()](state) {
      state.isLoading = true;
    },
    [addUser.rejected.toString()](state) {
      state.isLoading = false;
    },
    [addUser.fulfilled.toString()](state, { payload }) {
      state.isLoading = false;
      usersAdapter.addOne(state, payload);
    },
    [filterByJob.pending.toString()](state) {
      state.isLoading = true;
    },
    [filterByJob.rejected.toString()](state) {
      state.isLoading = false;
    },
    [filterByJob.fulfilled.toString()](state, { payload }) {
      state.isLoading = false;
      usersAdapter.removeAll(state);
      usersAdapter.setAll(state, payload);
    },
    [deleteUser.pending.toString()](state) {
      state.isLoading = true;
    },
    [deleteUser.rejected.toString()](state) {
      state.isLoading = false;
    },
    [deleteUser.rejected.toString()](state, { payload: id }) {
      state.isLoading = false;
      usersAdapter.removeOne(state, id);
    }
  }
});

export const { usersAddMany, usersAddOne, usersRemoveOne } = usersSlice.actions;

export const usersSelectors = usersAdapter.getSelectors(
  (state: any) => state.users
);

const userReducer = usersSlice.reducer;
export default userReducer;
