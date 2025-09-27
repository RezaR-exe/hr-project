import axios from 'axios';

async function run(text) {
    try {
        const response = await axios.post(
            'https://api.sapling.ai/api/v1/rephrase',
            {
                key: 'W70SB1F3YWD0AOE3R8JWLNTVYJZ12B43',
                text,
                mapping:'informal_to_formal'
            },
        );
        const {status, data} = response;
        console.log({status});
        console.log(JSON.stringify(data, null, 4));
    } catch (err) {
        const { msg } = err.response.data;
        console.log({err: msg});
    }
}

run('hey wuts going on');