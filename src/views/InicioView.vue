<template>
    <ion-page>
        <ToolBar title="Inicio"></ToolBar>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>Inicio</ion-card-title>
                                <ion-card-subtitle>Listado de envios pendeintes</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                    <EnviosItem v-for="envio in envios" :key="envio.id"
                                        :envio="envio" @entregar="cambiarEstado(envio)" />

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
import { ref } from "vue";
import EnviosItem from "@/components/EnviosItemView.vue";
import axios from 'axios'

import {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle
} from '@ionic/vue'
import ToolBar from '@/components/ToolBar.vue'

export default {
    components: { EnviosItem, IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
        IonCardHeader, IonCardTitle, IonCardSubtitle,ToolBar },
    data() {
        return {
            envios: [],
            // Variable para definir el header de autorización 
            config: {},
        }
    },
    methods: {
        // Petición para consultar datos 
        loadData() {
            this.envios = []
            console.log(this.config);
            axios.get('http://127.0.0.1:8000/api/envio/select', this.config)
                .then(response => {
                    let res = response.data
                    if (res.code == 200) {
                        this.envios = res.data.filter(envio=>envio.estado_envio=="PENDIENTE")
                    }
                })
                .catch(error => console.log('Ha ocurrido un error'))
        }, 
        cambiarEstado(envio){
            envio.estado_envio="ENTREGADO";
            axios.put('http://127.0.0.1:8000/api/envio/update/'+envio.id, envio,this.config)
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
} 
</script>