// src/api.js
import { Listing } from "../interfaces/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/properties";

export const getProperties = async (page: number = 1, limit: number = 10): Promise<Listing[]> => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getPropertiesById = async (id: string): Promise<Listing> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePropierties = async (listing: Listing): Promise<Listing> => {
  try {
    const response = await axios.put(`${API_URL}/${listing.id}`, listing, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addProperties = async (listing: Listing): Promise<Listing> => {
  try {
    const response = await axios.post(API_URL, listing, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const searchAddress = async (fullAddress: string) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${fullAddress}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al buscar la dirección");
  }
};
