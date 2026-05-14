// src/stores/popupStore.js
import type { Component } from 'svelte';
import { writable } from 'svelte/store';

// Initialize the store's state
const initialState: {
    component: null | Component<any>, 
    props: Record<string, unknown>,       
    isOpen: boolean
} = {
    component: null, // The component to render (or null if closed)
    props: {},       // Props to pass to the component
    isOpen: false,   // Whether the popup is currently visible
};

const popupStore = writable(initialState);

function openPopup<T extends Record<string, unknown>>(component: Component<T>, props: T) {
    popupStore.set({
        component: component,
        props: props,
        isOpen: true,
    });
}

function closePopup() {
    popupStore.set(initialState);
}

export { popupStore, openPopup, closePopup };