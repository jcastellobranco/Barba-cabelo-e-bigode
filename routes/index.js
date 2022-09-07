var express = require('express');
var router = express.Router();
const isAuthUser = require('../middlewares/isAuthUser');
const validationMiddlewares = require('../middlewares/validationMiddlewares');
const indexController = require('../controllers/indexController')
const userController = require('../controllers/userController')
const contentController = require('../controllers/contentController')
const notLogged = require('../middlewares/notLogged');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/home',indexController.home)
router.get('/',indexController.home)

router.get('/assinante',isAuthUser,userController.assinante)
router.get('/pagamento',userController.pagamento)
router.get('/carrinho/:id?',userController.carrinho)
router.get('/cadastro',notLogged,userController.cadastro)
router.get('/contato',userController.contato)
router.get('/barbearias',contentController.barbearias)
router.get('/planos/',contentController.planos)
router.post('/logar', userController.auth)
router.post('/cadastro',validationMiddlewares,userController.processRegister)
router.post('/pagamento',userController.pagar)
router.get('/login',notLogged,userController.logar)
router.get('/logout',isAuthUser,userController.logout)


module.exports = router;
