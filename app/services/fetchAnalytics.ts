import axios from 'axios';

const fetchAnalytics = async () => {
    return axios.get('/api/analytics');
};

export default fetchAnalytics;
