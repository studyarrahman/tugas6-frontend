<template>
    <div class="m-5 border border-radius p-5">
    <h1 class="mb-4">Update Kategori</h1>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateKode" placeholder="Kode"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateKategori" placeholder="Kategori"
        aria-label="default input example" /><br />
    </div>

    <div class="mt-5 d-flex justify-content-between">
        <router-link to="/dashboard" class="btn btn-secondary">Kembali</router-link>
        <button type="button" class="btn btn-primary" v-on:click="updatekategori()">Update Kategori</button>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const selectByKode = 'http://localhost/library/selectkategoribykode.php';
const updateApi = 'http://localhost/library/updatekategoribykode.php';

export default {
    data() {
    return {
        selectKategori: ref([]),
        updateKode: '',
        updateKategori: '',
    };
    },

    mounted() {
    this.getKategori();
    },

    methods: {
    getKategori() {
        axios.get(selectByKode + '?kode=' + this.$route.params.kode)
        .then((resp) => {
            console.log(resp);
            this.selectKategori = resp.data;
            this.updateKode = this.selectKategori.kode;
            this.updateKategori = this.selectKategori.kategori;
        })
        .catch((err) => {
            console.log(err);
        });
    },

    updatekategori() {
        let formData = new FormData();

        formData.append('kode', this.updateKode);
        formData.append('kategori', this.updateKategori);

        axios.post(updateApi, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then((resp) => {
            console.log(resp.data);
            this.getKategori();
        })
        .catch((err) => {
            console.log(err);
        });
    },
    },
};
</script>
