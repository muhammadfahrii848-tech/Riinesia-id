export default async function handler(req, res) {
    // 🔒 TARUH API KEY RUANGOTP ASLI LO DI SINI (AMAN, GAK BAKAL KELIHATAN)
    const API_KEY_RUANG = "aa4e17e6-d0ab-4ce1-b8ae-4180c3eb9986"; 
    const BASE_URL_RUANG = "https://api.ruangotp.site/api/v1";

    const { aksi, id_layanan, id_order } = req.query;

    try {
        if (aksi === 'beli_nomor') {
            const response = await fetch(`${BASE_URL_RUANG}/order?api_key=${API_KEY_RUANG}&service_id=${id_layanan}`);
            const data = await response.json();
            return res.status(200).json(data);
        }

        if (aksi === 'cek_otp') {
            const response = await fetch(`${BASE_URL_RUANG}/status?api_key=${API_KEY_RUANG}&order_id=${id_order}`);
            const data = await response.json();
            return res.status(200).json(data);
        }

        return res.status(400).json({ error: "Aksi tidak valid, bre" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
