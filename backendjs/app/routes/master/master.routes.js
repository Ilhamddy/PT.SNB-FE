import { authJwt } from "../../middleware/index.js";
import controller from "../../controllers/master/combobox.controller.js";

export default function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/master/combobox",
      [authJwt.verifyToken],
      controller.selectComboBox
    );

    app.get(
      "/api/master/desa-kelurahan",
      [authJwt.verifyToken],
      controller.desaKelurahan
    );

    app.get(
      "/api/master/kecamatan",
      [authJwt.verifyToken],
      controller.getKecamatan
    );

    app.get(
      "/api/master/combobox-registrasi",
      [authJwt.verifyToken],
      controller.comboRegistrasi
    );

    app.get(
      "/api/master/combobox-asuransi",
      [authJwt.verifyToken],
      controller.comboAsuransi
    );

    app.get(
      "/api/master/combobox-pulang",
      [authJwt.verifyToken],
      controller.comboPulang
    );

    app.get(
      "/api/master/combobox-payment",
      [authJwt.verifyToken],
      controller.comboPayment
    );

    app.get(
      "/api/master/combobox-setting-produk",
      [authJwt.verifyToken],
      controller.comboSettingProduk
    );

    app.get(
      "/api/master/combobox-penerimaan-barang",
      [authJwt.verifyToken],
      controller.comboPenerimaanBarang
    )

    app.get(
      "/api/master/combobox-distribusi-order",
      [authJwt.verifyToken],
      controller.comboDistribusiOrder
    )

    app.get(
      "/api/master/combobox-stok-opname",
      [authJwt.verifyToken],
      controller.comboStokOpname
    )

  };