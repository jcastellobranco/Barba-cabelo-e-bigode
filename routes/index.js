var express = require('express');
var router = express.Router();
const isAuthUser = require('../middlewares/isAuthUser');
const validationMiddlewares = require('../middlewares/validationMiddlewares');
const indexController = require('../controllers/indexController')
const userController = require('../controllers/userController')
const contentController = require('../controllers/contentController')
const hasAssinaturaAtiva = require('../middlewares/hasAssinaturaAtiva')
const notLogged = require('../middlewares/notLogged');
const multer = require('multer');
const path = require('path');
const salvaPlano = require('../middlewares/salvaPlano')
const marcaNovoUsuario = require('../middlewares/marcaNovoUsuario')



const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp' 
  ]

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback)=>{
        const folder = path.join(__dirname, "../public/images/profile");
        callback(null, folder);
    },
    filename : (req, file, callback) => {
        const imageName = Date.now() + file.originalname;
        callback(null, imageName);
    }
})

const upload = multer({
    storage : multerDiskStorage ,
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(null, false)
        }

        cb(null, true)
    }
})

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});



router.get('/home',indexController.home)
router.get('/',indexController.home)

router.get('/equipe', indexController.equipe)
router.get('/politica', indexController.politica)
router.get('/faleconosco', indexController.faleconosco)

router.get('/assinante',isAuthUser,userController.assinante)
router.get('/pagamento/:id',salvaPlano,isAuthUser,hasAssinaturaAtiva,indexController.pagamento)
//router.get('/carrinho/:id?',indexController.carrinho)
router.get('/cadastro',notLogged,userController.cadastro)
router.get('/contato',indexController.contato)
router.get('/barbearias',contentController.barbearias)
router.get('/planos/',contentController.planos)
router.post('/logar/:id?', userController.auth)
router.post('/cadastro',validationMiddlewares,userController.processRegister)
router.post('/pagamento/:id',marcaNovoUsuario,userController.pagar)
router.get('/login/:id?',notLogged,userController.logar)
router.get('/logout',isAuthUser,userController.logout)
router.put('/foto/:id', upload.single('userImage'), userController.foto)
router.get('/teste', indexController.teste)
router.put('/assinante/:id', userController.alterarDados)


module.exports = router;
