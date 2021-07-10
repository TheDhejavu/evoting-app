import axios from "axios";
import { authHeader } from "../helpers/auth";

const BASE_URL = `${process.env.VUE_APP_API_URL}/api/v1`

export function getAllCountry() {
    return axios.get(`${BASE_URL}/countries`)
}

export function createIdentity(formData) {
    const url = `${BASE_URL}/identity`;
    return axios({
        method: "post",
        url: url,
        data: formData,
        headers: { 
            "Content-Type": "multipart/form-data" 
        }
    })
}

export function getCurrentIdentity() {
    return axios.get(`${BASE_URL}/identity/me`, authHeader())
}

export function loginIdentity(data) {
    return axios.post(`${BASE_URL}/login/identity`, data)
}

export function getElections() {
    return axios.get(`${BASE_URL}/elections`, authHeader())
}

export function getElection(id) {
    return axios.get(`${BASE_URL}/elections/${id}`, authHeader())
}

export function initAccreditation(id) {
    return axios.post(`${BASE_URL}/accreditation/${id}`, authHeader())
}

export function castVote(id) {
    return axios.post(`${BASE_URL}/vote/${id}`, authHeader())
}

export function getGroup() {
    return axios.get(`${BASE_URL}/group`, authHeader())
}