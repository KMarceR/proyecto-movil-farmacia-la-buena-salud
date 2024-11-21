<template>
    <ion-item>
        <ion-label>
            <h2>Factura: {{ envio?.venta?.id }}</h2>
            <p>Cliente: {{ envio?.venta?.cliente.nombre }}</p>
            <p>Direccion: {{ envio?.direccion }}</p>
            <p>Total: <strong>{{ envio?.costo_envio }}</strong></p>
            <p>Estado: <strong>{{ envio?.estado_envio }}</strong></p>
        </ion-label>
        <ion-button color="success" @click="marcarComoEntregado" v-if="envio?.estado_envio === 'PENDIENTE'">
            Marcar como Entregado
        </ion-button>
    </ion-item>
</template>

<script>
export default {
    props: {
        envio: {
            type: Object,
            required: true,
        },
    },
    methods: {
        // Emite un evento al componente padre para actualizar el estado de la solicitud
        marcarComoEntregado() {
            this.$emit("entregar", this.envio);
        },
    },
};
</script>