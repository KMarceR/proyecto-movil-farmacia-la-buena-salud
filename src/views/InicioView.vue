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
                                <ion-card-subtitle>Listado de solicitudes pendeintes</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-list>
                                    <SolicitudItem v-for="solicitud in solicitudes" :key="solicitud.id"
                                        :solicitud="solicitud" @entregar="cambiarEstado" />
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
import SolicitudItem from "@/components/SolicitudesItemView.vue";

export default {
    components: { SolicitudItem },
    setup() {
        const solicitudes = ref([
            { id: 1, nombre: "Paquete A", estado: "Pendiente", destino: "San Salvador" },
            { id: 2, nombre: "Paquete B", estado: "Pendiente", destino: "Santa Ana" },
            { id: 3, nombre: "Paquete C", estado: "Pendiente", destino: "San Miguel" },
        ]);

        const cambiarEstado = (id) => {
            const solicitud = solicitudes.value.find((s) => s.id === id);
            if (solicitud) solicitud.estado = "Entregado";
        };

        return { solicitudes, cambiarEstado };
    },
};
</script>