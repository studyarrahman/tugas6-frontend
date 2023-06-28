<template>
    <div class="m-5 border border-radius p-5">
    <h1 class="mb-4">Update Anggota</h1>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateNomor" placeholder="Nomor" aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateNama" placeholder="Nama" aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateJenisKelamin" placeholder="Jenis Kelamin" aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateAlamat" placeholder="Alamat" aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="text" v-model="updateNoHp" placeholder="No. HP" aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
        <input class="form-control" type="date" v-model="updateTanggalTerdaftar" placeholder="Tanggal Terdaftar" aria-label="default input example" /><br />
    </div>

    <div class="mt-5 d-flex justify-content-between">
        <router-link to="/profile" class="btn btn-secondary">Kembali</router-link>
        <button type="button" class="btn btn-primary" v-on:click="updateAnggota">Update Anggota</button>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const selectByNomor = 'http://localhost/library/selectanggotabynomor.php';
const updateAnggotaAPI = 'http://localhost/library/updateanggotabynomor.php';

export default {
    data() {
    return {
        selectAnggota: ref({}),
        updateNomor: '',
        updateNama: '',
        updateJenisKelamin: '',
        updateAlamat: '',
        updateNoHp: '',
        updateTanggalTerdaftar: '',
    };
    },

    mounted() {
    this.getAnggota();
    },

    methods: {
    getAnggota() {
        axios
        .get(selectByNomor + '?nomor=' + this.$route.params.nomor)
        .then((resp) => {
            console.log(resp);
            this.selectAnggota = resp.data;
            this.updateNomor = this.selectAnggota.nomor;
            this.updateNama = this.selectAnggota.nama;
            this.updateJenisKelamin = this.selectAnggota.jenis_kelamin;
            this.updateAlamat = this.selectAnggota.alamat;
            this.updateNoHp = this.selectAnggota.no_hp;
            this.updateTanggalTerdaftar = this.selectAnggota.tanggal_terdaftar;
        })
        .catch((err) => {
            console.log(err);
        });
    },

    updateAnggota() {
        let formData = new FormData();
        formData.append('nomor', this.updateNomor);
        formData.append('nama', this.updateNama);
        formData.append('jenis_kelamin', this.updateJenisKelamin);
        formData.append('alamat', this.updateAlamat);
        formData.append('no_hp', this.updateNoHp);
        formData.append('tanggal_terdaftar', this.updateTanggalTerdaftar);

        axios
        .post(updateAnggotaAPI, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then((resp) => {
            console.log(resp.data);
            this.getAnggota();
        })
        .catch((err) => {
            console.log(err);
        });
    },
    },
};
</script>
