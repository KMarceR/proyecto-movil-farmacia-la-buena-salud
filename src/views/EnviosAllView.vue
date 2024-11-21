<template>
    <ion-page>
        <ion-header>
            <ToolBar title="Listado de envios"></ToolBar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-segment v-model="filtro" class="ion-margin-bottom">
                <ion-segment-button value="todas">Todas</ion-segment-button>
                <ion-segment-button value="PENDIENTE">Pendientes</ion-segment-button>
                <ion-segment-button value="ENTREGADO">Entregadas</ion-segment-button>
            </ion-segment>

            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>Envios</ion-card-title>
                                <ion-card-subtitle>
                                    Listado de envios - {{ filtro.toUpperCase() }}
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                    <EnviosItem v-for="envio in enviosFilter" :key="envio.id" :envio="envio"
                                        @entregar="cambiarEstado(envio)" />
                                </ion-list>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import { ref, computed } from "vue";
import EnviosItem from "@/components/EnviosItemView.vue";
import axios from 'axios'
import {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton
} from '@ionic/vue'
import ToolBar from '@/components/ToolBar.vue'

export default {
    components: {
        EnviosItem, IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
        IonCardHeader, IonCardTitle, IonCardSubtitle, ToolBar,IonSegment, IonSegmentButton
    },
    data() {
        return {
            filtro: "All",
            envios: [],
            // Variable para definir el header de autorización 
            config: {},
        }
    },
    computed: {
        enviosFilter() {
            if (this.filtro == "PENDIENTE") {
                return this.envios.filter(envio => envio.estado_envio == "PENDIENTE")
            } else if (this.filtro == "ENTREGADO") {
                return this.envios.filter(envio => envio.estado_envio == "ENTREGADO")
            }
            return this.envios;
        }
    }
    ,
    methods: {
        // Petición para consultar datos 
        loadData() {
            this.envios = []
            console.log(this.config);
            axios.get('http://127.0.0.1:8000/api/envio/select', this.config)
                .then(response => {
                    let res = response.data
                    if (res.code == 200) {
                        this.envios = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error'))
        },
        cambiarEstado(envio) {
            envio.estado_envio = "ENTREGADO";
            axios.put('http://127.0.0.1:8000/api/envio/update/' + envio.id, envio, this.config)
                .then(response => {
                    this.loadData();
                })
                .catch(error => console.log('Ha ocurrido un error'))
        }
        ,
        async getToken() {
            let token = await this.$storage.get('token')
            this.config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        },
    },
    async ionViewWillEnter() {
        await this.getToken();
        this.loadData();
    }
};
</script>