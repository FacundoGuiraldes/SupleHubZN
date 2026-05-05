const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

function crearTransporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

function filaItem(item) {
    return `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #1e2435;font-size:14px;color:#c8d0e0;">
          ${item.nombre}
        </td>
        <td style="padding:10px 8px;border-bottom:1px solid #1e2435;text-align:center;font-size:14px;color:#c8d0e0;">
          ${item.cantidad}
        </td>
        <td style="padding:10px 8px;border-bottom:1px solid #1e2435;text-align:right;font-size:14px;color:#f39c12;font-weight:700;">
          $${(item.precio * item.cantidad).toLocaleString('es-AR')}
        </td>
      </tr>`;
}

function htmlRecibo({ nombre, email, items, total, fecha }) {
    const filas = items.map(filaItem).join('');
    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0c14;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c14;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0f1219;border-radius:16px;overflow:hidden;border:1px solid #1e2435;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3498db 0%,#2980b9 100%);padding:32px 36px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">SupleHubZN</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Confirmación de pedido</p>
          </td>
        </tr>

        <!-- Saludo -->
        <tr>
          <td style="padding:28px 36px 0;">
            <p style="margin:0;color:#e0e6f0;font-size:15px;">Hola <strong>${nombre}</strong>,</p>
            <p style="margin:10px 0 0;color:#8899aa;font-size:14px;line-height:1.6;">
              Recibimos tu pedido. A continuación encontrás el detalle de tu compra. 
              Recordá completar el pago por MercadoPago si todavía no lo hiciste.
            </p>
          </td>
        </tr>

        <!-- Tabla de productos -->
        <tr>
          <td style="padding:24px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <thead>
                <tr style="background:#161b28;">
                  <th style="padding:10px 8px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#556070;font-weight:700;">Producto</th>
                  <th style="padding:10px 8px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#556070;font-weight:700;">Cant.</th>
                  <th style="padding:10px 8px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#556070;font-weight:700;">Subtotal</th>
                </tr>
              </thead>
              <tbody>${filas}</tbody>
            </table>
          </td>
        </tr>

        <!-- Total -->
        <tr>
          <td style="padding:16px 36px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 8px;border-top:2px solid #3498db;text-align:right;font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.5px;">
                  Total: <span style="color:#f39c12;">$${total.toLocaleString('es-AR')}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Botón MercadoPago -->
        <tr>
          <td style="padding:24px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://link.mercadopago.com.ar/suplehubzn"
                     style="display:inline-block;background:linear-gradient(135deg,#3498db 0%,#2980b9 100%);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.3px;">
                    Completar pago en MercadoPago →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Aviso WhatsApp -->
        <tr>
          <td style="padding:0 36px 8px;">
            <p style="margin:0;color:#8899aa;font-size:13px;text-align:center;line-height:1.6;">
              Después de pagar, avisanos por 
              <a href="https://wa.me/541122455638" style="color:#25d366;font-weight:700;text-decoration:none;">WhatsApp</a>
              para confirmar tu pedido y coordinar la entrega.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px 28px;border-top:1px solid #1e2435;margin-top:12px;">
            <p style="margin:0;color:#445060;font-size:12px;text-align:center;">
              © 2026 SupleHubZN · Olivos, Buenos Aires<br>
              Fecha del pedido: ${fecha}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

router.post('/', async (req, res) => {
    const { nombre, email, items, total } = req.body;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ mensaje: 'Datos del pedido incompletos.' });
    }

    const fecha = new Date().toLocaleDateString('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    try {
        const transporter = crearTransporter();

        await transporter.sendMail({
            from: `"SupleHubZN" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `✅ Pedido recibido — $${total.toLocaleString('es-AR')} · SupleHubZN`,
            html: htmlRecibo({ nombre: nombre || 'Cliente', email, items, total, fecha }),
        });

        res.json({ ok: true, mensaje: 'Recibo enviado correctamente.' });
    } catch (err) {
        console.error('Error enviando email:', err);
        res.status(500).json({ mensaje: 'No se pudo enviar el recibo. Verificá las credenciales de email.' });
    }
});

module.exports = router;
