//localhost:3000/endpoint/?key1=value&key2=value&....

const pre = document.querySelector('pre');
const btn = document.querySelector('#btn');

const foo = async () => {
    try {
        const res = await fetch("http://localhost:3000/question");
        if (!res.ok) {
            console.log(res);
            return;
        }
        const data = await res.json();
        pre.innerText = JSON.stringify(data, null, 2)

    }
    catch (err) {
        console.log(err);
        pre.innerText = err;
    }
}

btn.addEventListener('click', async(e) => {
    e.preventDefault();
    await foo();
})
