export default async function handler(req, res) {
    // 🔒 GANTI DENGAN USERNAME SAWERIA LO YANG ASLI
    const USERNAME_SAWERIA = "Fahrii04"; 

    const { nominal } = req.query;

    if (!nominal || nominal < 1000) {
        return res.status(400).json({ error: "Minimal Rp 1.000, bre!" });
    }

    try {
        // Kita generate link pembayaran Saweria otomatis sesuai nominal inputan pembeli
        // Pembeli tinggal scan/bayar lewat link resmi Saweria lo
        const linkPembayaran = `https://saweria.co/${USERNAME_SAWERIA}?amount=${nominal}`;
        
        return res.status(200).json({
            status: "SUCCESS",
            data: {
                // Kita buat barcode generator gratisan biar QRIS-nya langsung muncul di layar web lo
                qr_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(linkPembayaran)}`,
                checkout_url: linkPembayaran
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}