var express = require('express');
var router = express.Router();
var hr = require('../controllers/hrController');
var verify = require('../auth/verifyToken');

router.post('/api/create/hr', hr.hr_signup);
router.post('/api/login', hr.hr_login);
router.get('/api/logged/hr',verify, hr.logged_in_hr);
router.get('/api/main/hrs', verify, hr.hr_list);
router.get('/api/main/hrs/detail/:id', verify, hr.hr_detail);
router.post('/api/organization/create', verify, hr.hr_create_organization);
router.get('/api/organization', verify, hr.hr_organizations_list);
router.post('/api/jobs/create', verify, hr.hr_create_job);
router.get('/api/jobs', verify, hr.hr_job_list);
router.get('/api/jobs/detail/:id', verify, hr.hr_job_view_detail);
router.post('/api/jobs/delete/:id', verify, hr.hr_delete_job);
router.post('/api/jobs/update/:id', verify, hr.hr_update_job);
router.post('/department/create', verify, hr.hr_create_department);
router.get('/api/main/departments', verify, hr.hr_list_department);
router.get('/api/main/departments/detail/:id', verify, hr.hr_list_department_detail);
router.post('/user/create', verify, hr.hr_create_user);
router.get('/api/main/users', verify, hr.hr_list_users);
router.get('/api/main/users/detail/:id', verify, hr.hr_list_users_detail);
router.post('/benefit/create', verify, hr.hr_create_benefit);
router.get('/api/main/benefits', verify, hr.hr_list_benefits);
router.get('/api/main/benefits/detail/:id', verify, hr.hr_list_benefit_detail);

module.exports = router;
