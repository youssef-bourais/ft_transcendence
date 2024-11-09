
async function fetchData() 
{
    try 
    {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) 
            throw new Error('Network response was not ok');

        const data = await response.json();
        console.log('Data:', data);
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
}

fetchData();
console.log("This will log immediately, before the request completes");
