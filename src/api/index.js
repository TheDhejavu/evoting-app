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

export function castVote(id) {
    return axios.post(`${BASE_URL}/vote/${id}`, authHeader())
}

export function getGroup() {
    return axios.get(`${BASE_URL}/group`, authHeader())
}

export function accredite(id, payload) {
    return axios.post(`${BASE_URL}/accreditation/${id}/accredite`, payload, authHeader())
}

export function castBallot(id, payload) {
    return axios.post(`${BASE_URL}/voting/${id}/cast-ballot`, payload, authHeader())
}

export function getResults(id) {
    return axios.get(`${BASE_URL}/voting/${id}/results`, authHeader())
}

export function getBlockchain() {
    return axios.get(`${BASE_URL}/blockchain`, authHeader())
}