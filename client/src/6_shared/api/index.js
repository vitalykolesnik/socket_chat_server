import axios from "axios";
import { BASE_URL } from "6_shared/config";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chat-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const userApi = {
  async getAll() {
    const { data } = await api.get(`/users`);
    return data;
  },

  async getOne(payload) {
    const { data } = await api.get(`/user/${payload.id}`);
    return data;
  },

  async getMe() {
    const { data } = await api.get(`/user`);
    return data;
  },

  async follow(payload) {
    const { data } = await api.put(`/user/follow`, {
      friendId: payload.friendId,
    });
    return data;
  },
};

export const conversationApi = {
  async getOne(payload) {
    const { data } = await api.get(`/conversation/${payload.id}`);
    return data;
  },

  async getAll() {
    const { data } = await api.get(`/conversation`);
    return data;
  },

  async createConv(payload) {
    const { data } = await api.post("/conversation", {
      title: payload.title,
    });
    return data;
  },

  async deleteConv(payload) {
    const { data } = await api.delete(`/conversation/${payload.id}`);
    return data;
  },
};

export const messageApi = {
  async createMessage(payload) {
    const { data } = await api.post(`/message/${payload.conversationId}`, {
      text: payload.text,
    });
    return data;
  },

  async deleteMessage(payload) {
    const { data } = await api.delete(`/message/${payload.id}`);
    return data;
  },
};

export const authApi = {
  async login(payload) {
    const { data } = await api.post("/login", payload);
    return data;
  },

  async signup(payload) {
    const { data } = await api.post("/signup", payload);
    return data;
  },
};
