<template>
  <nav id="navbar-example2" class="navbar navbar-dark bg-dark px-3 mb-3 fixed-top">
  <a class="navbar-brand" href="#">CRUD OPERATION</a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/dashboard">Back To Dashboard Admin</a>
    </li>
  </ul>
</nav>
<br>
  <div class="container my-5">
    <div class="mb-5">
      <h1 class="text-center">CRUD Operation Anggota</h1>
      <hr />
    </div>
    <!-- Tombol untuk memunculkan modal -->
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Tambah Anggota
      </button>
    </div>

    <!-- Modal Insert -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Data Anggota</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data">
              <input class="form-control" type="text" v-model="insertNomor" placeholder="Nomor" id="insertNomor" /><br />
              <input class="form-control" type="text" v-model="insertNama" placeholder="Nama" id="insertNama" /><br />
              <input class="form-control" type="text" v-model="insertJenisKelamin" placeholder="Jenis Kelamin (Laki-laki / Perempuan)" id="insertJenisKelamin" /><br />
              <input class="form-control" type="text" v-model="insertAlamat" placeholder="Alamat" id="insertAlamat" /><br />
              <input class="form-control" type="text" v-model="insertNoHp" placeholder="No. HP" id="insertNoHp" /><br />
              <input class="form-control" type="date" v-model="insertTanggalTerdaftar" placeholder="Tanggal Terdaftar" id="insertTanggalTerdaftar" /><br />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" v-on:click="postAnggota">Tambah Anggota</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="table-responsive">
      <table class="table border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nomor</th>
            <th scope="col">Nama</th>
            <th scope="col">Jenis Kelamin</th>
            <th scope="col">Alamat</th>
            <th scope="col">No HP</th>
            <th scope="col">Tanggal Terdaftar</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
  <tr v-for="(data, index) in paginatedAnggota" :key="data.nomor">
    <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
    <td>{{ data.nomor }}</td>
    <td>{{ data.nama }}</td>
    <td>{{ data.jenis_kelamin }}</td>
    <td>{{ data.alamat }}</td>
    <td>{{ data.no_hp }}</td>
    <td>{{ data.tanggal_terdaftar }}</td>
    <td>
      <router-link :to="{ name: 'updateProfile', params: { nomor: data.nomor } }" class="btn btn-warning me-3">Update</router-link>
      <button type="button" class="btn btn-danger" v-on:click="deleteAnggota(data.nomor)">Hapus</button>
    </td>
  </tr>
</tbody>
      </table>
    </div>
  </div>

  <nav aria-label="Paginasi Anggota">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: currentPage === 1 }">
      <button class="page-link" @click="paginate(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    </li>
    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
      <button class="page-link" @click="paginate(page)">{{ page }}</button>
    </li>
    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
      <button class="page-link" @click="paginate(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </li>
  </ul>
</nav>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const allAnggotaAPI = 'http://localhost/library/selectallanggota.php';
const insertAnggotaAPI = 'http://localhost/library/insertanggota.php';
const deleteAnggotaAPI = 'http://localhost/library/deleteanggotabynomor.php';

export default {
  data() {
    return {
      anggota: ref([]),
      insertNomor: '',
      insertNama: '',
      insertJenisKelamin: '',
      insertAlamat: '',
      insertNoHp: '',
      insertTanggalTerdaftar: '',

      currentPage: 1,
      perPage: 5,
      paginatedAnggota: ref ([]),
    };
  },

  mounted() {
    this.readData();
  },

  computed: {
  totalPages() {
    return Math.ceil(this.anggota.length / this.perPage);
  },
},


  methods: {
    paginate(page) {
    const startIndex = (page - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.paginatedAnggota = this.anggota.slice(startIndex, endIndex);
    this.currentPage = page;
  },

  readData() {
    axios
      .get(allAnggotaAPI)
      .then((resp) => {
        console.log(resp);
        this.anggota = resp.data;
        this.paginate(this.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  },

    postAnggota() {
      let formData = new FormData();
      formData.append('nomor', this.insertNomor);
      formData.append('nama', this.insertNama);
      formData.append('jenis_kelamin', this.insertJenisKelamin);
      formData.append('alamat', this.insertAlamat);
      formData.append('no_hp', this.insertNoHp);
      formData.append('tanggal_terdaftar', this.insertTanggalTerdaftar);

      axios
        .post(insertAnggotaAPI, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.readData();
          this.insertNomor = '';
          this.insertNama = '';
          this.insertJenisKelamin = '';
          this.insertAlamat = '';
          this.insertNoHp = '';
          this.insertTanggalTerdaftar = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteAnggota(nomor) {
      if (confirm('Apakah Anda ingin menghapus data?')) {
        axios
          .get(deleteAnggotaAPI + '?nomor=' + nomor)
          .then((resp) => {
            console.log(resp);
            this.readData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
