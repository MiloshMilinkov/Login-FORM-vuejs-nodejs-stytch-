<script setup>

import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

const Logout = async () =>{
    const res = await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_token: localStorage.getItem('token')
            })
        }).then(res => res.json());
        if (res.success){
            localStorage.removeItem('token');
            router.push('/login');
        }
        else{
            alert(res.message);
        }
};


</script>

<template>
    <main>
        <h1>Hello</h1>
        <button @click = "Logout">Logout</button>
    </main>
</template>

<script setup>

</script>

<style scoped>
    main{
        padding: 1.5rem;
    }
    
    h1{
        margin-bottom: 1rem;
    }
</style>