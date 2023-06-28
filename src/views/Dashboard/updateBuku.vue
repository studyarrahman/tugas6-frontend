<template>
  <div class="m-5 border border-radius p-5">
    <h1 class="mb-4">Update Buku</h1>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updateKode" placeholder="Kode"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updateKodeKategori" placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updateJudul" placeholder="Judul"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updatePengarang" placeholder="Pengarang"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updatePenerbit" placeholder="Penerbit"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updateTahun" placeholder="Tahun"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="date" v-model="updateTanggalInput" placeholder="Tanggal Input"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" v-model="updateHarga" placeholder="Harga"
        aria-label="default input example" /><br />
    </div>
    <div class="mb-3">
      <input class="form-control" type="file" ref="file" />
      <img :src="file" alt="file_cover" style="max-width: 150px; margin-top: 10px" />
    </div>

    <div class="mt-5 d-flex justify-content-between">
      <router-link to="/dashboard" class="btn btn-secondary">Kembali</router-link>
      <button type="button" class="btn btn-primary" v-on:click="updateBuku()">Update Buku</button>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { ref } from 'vue';

const selectByKode = 'http://localhost/library/selectbukubykode.php';
const updateApi = 'http://localhost/library/updatebukubykode.php';

export default {
  data() {
    return {
      selectBuku: ref([]),
      updateKode: '',
      updateKodeKategori: '',
      updateJudul: '',
      updatePengarang: '',
      updatePenerbit: '',
      updateTahun: '',
      updateTanggalInput: '',
      updateHarga: '',
      file: '',
    };
  },

  mounted() {
    this.getBuku();
  },

  methods: {
    getBuku() {
      axios.get(selectByKode + '?kode=' + this.$route.params.kode)
        .then((resp) => {
          console.log(resp);
          this.selectBuku = resp.data;
          this.updateKode = this.selectBuku.kode;
          this.updateKodeKategori = this.selectBuku.kode_kategori;
          this.updateJudul = this.selectBuku.judul;
          this.updatePengarang = this.selectBuku.pengarang;
          this.updatePenerbit = this.selectBuku.penerbit;
          this.updateTahun = this.selectBuku.tahun;
          this.updateTanggalInput = this.selectBuku.tanggal_input;
          this.updateHarga = this.selectBuku.harga;
          this.file = this.selectBuku.file_cover;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateBuku() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append('kode', this.updateKode);
      formData.append('kode_kategori', this.updateKodeKategori);
      formData.append('judul', this.updateJudul);
      formData.append('pengarang', this.updatePengarang);
      formData.append('penerbit', this.updatePenerbit);
      formData.append('tahun', this.updateTahun);
      formData.append('tanggal_input', this.updateTanggalInput);
      formData.append('harga', this.updateHarga);
      formData.append('file_cover', this.file);

      axios.post(updateApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.getBuku();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
