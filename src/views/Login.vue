<template>
    <main>
        <header>
            <h1 class="logo">SECRET APP</h1>
            <h2>Login</h2>
            <p>Login or create and account to start using the app.</p>
        </header>   
        <form @submit.prevent = "Login">
            <label>
                <span>Enter your email</span>
                <input type="email" v-model="email" placeholder="test@test.com">
            </label>
            <label>
                <span>Enter your password</span>
                <input type="password" v-model="password" placeholder="*************">
            </label>

            <input type="submit" value="Login">
        </form>
        <footer>
            <p>
                Don't have an account? <router-link to="/register">Register</router-link> 
            </p>
        </footer>
    </main>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const email = ref('');
    const password = ref('');


    const router = useRouter();

    const Login = async () => {
        if (!email.value || !password.value){
            return alert('Please fill in all fields.');
        }

        const res = await fetch('http://localhost:3333/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }).then(res => res.json());

        if (res.success){
            localStorage.setItem('token', res.token);
            router.push('/');
        }
        else{
            alert(res.message);
        }
    }
</script>

<style scoped>
    main{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100vh;
        background-color: var(--primary);
        color: #FFF;
    }

    header{
        padding: 1.5rem;
    }

    footer{
        background-color: #FFF;
        width: 100%;
        color: var(--dark);
        text-align: center;
        padding: 1.5rem;
        padding-bottom: 3rem;
    }

    form{
        flex: 1 1 0%;
        display: block;
        border-radius: 1.5rem 1.5rem 0 0;
        background-color: #FFF;
        box-shadow: 0px -4px 12px 4px rgba(0, 0, 0, 0.2);
        color: var(--dark);
        padding: 4rem 1.5rem;
        width: 100%;

    }

    header h2{
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    header p{
        font-size: 1rem;
        font-weight: 500;
    }

    form label{
        display: block;
        margin-bottom: 1.5rem;
    }

    form label span{
        display: block;
        color: var(--gray);
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    input:not([type="submit"]){
        display: block;
        width: 100%;
        color: var(--dark);
        background-color: var(--light);
        border-radius: 0.5rem;
        padding: 1.5rem 1rem;
        font-size: 1rem;
        font-weight: 500;
    }

    input:not([type="submit"])::placeholder{
        color: var(--gray);
        font-style: italic;
    }

    input[type="submit"]{
        background-color: var(--primary);
        display: block;
        width: fit-content;
        margin: 0 auto;
        font-size: 1.5rem;
        font-weight: 700;
        color: #FFF;
        padding: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: 0.2s ease;
    }

    input[type="submit"]:hover{
        background-color: var(--primary-dark);
    }
</style>