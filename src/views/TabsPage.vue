<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/inicio">
          <ion-icon aria-hidden="true" :icon="homeSharp" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/tabs/enviosAll">
          <ion-icon aria-hidden="true" :icon="gitPullRequestSharp" />
          <ion-label>Envios</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet }
  from '@ionic/vue';
import { homeSharp,gitPullRequestSharp } from 'ionicons/icons'; 
</script>