const express = require('express');
const rateLimit = require('express-rate-limit');

//------------------Supabase imports------------------------

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
app.use(express.json()); 


const supabase = createClient(supabaseUrl, supabaseAnonKey)


const insertOrderLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5, 
    message: "Too many orders created from this IP, please try again later."
});



app.post('/insertOrder', insertOrderLimiter, async (req, res) => {
    const { products, total, mesa } = req.body;

    const { data, error } = await supabase
        .from('orders')
        .insert([{ products: products, total: total, mesa: mesa }]);
    
    if (error) {
        console.error('Error inserting data:', error);
        return res.status(400).json({ error: error.message });
    }

    console.log('Data inserted successfully:', data);
    res.status(200).json({ message: 'Order sent successfully', data });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
