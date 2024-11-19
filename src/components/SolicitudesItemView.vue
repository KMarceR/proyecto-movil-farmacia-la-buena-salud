<template>
    <ion-item>
        <ion-label>
            <h2>{{ solicitud.nombre }}</h2>
            <p>Destino: {{ solicitud.destino }}</p>
            <p>Estado: {{ solicitud.estado }}</p>
        </ion-label>
        <ion-button color="success" @click="marcarComoEntregado" :disabled="solicitud.estado === 'Entregado'">
            Marcar como Entregado
        </ion-button>
    </ion-item>
</template>

<script>
export default {
    props: {
        solicitud: {
            type: Object,
            required: true,
        },
    },
    methods: {
        marcarComoEntregado() {
            this.$emit("entregar", this.solicitud.id);
        },
    },
};
</script>