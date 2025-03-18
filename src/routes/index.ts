import {Router, Request,Response} from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req:Request, res:Response) {
  console.log({status: 'healthy'})
  res.status(200).send('HEALTHY')
});

export default router;
