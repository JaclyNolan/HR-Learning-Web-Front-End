const  BACKEND_URL = {
    LOGIN_ENDPOINT: '/login',
    CHECK_TOKEN_ENDPOINT: '/check-token',
    LOGOUT_ENDPOINT: '/logout',
    // Staff Course
    STAFF_COURSE_INDEX_ENDPOINT: '/staff/courses',
    STAFF_COURSE_ADD_ENDPOINT: '/staff/courses/add',
    STAFF_COURSE_EDIT_ENDPOINT: '/staff/courses/edit',
    STAFF_COURSE_EDIT_TRAINEE_ENDPOINT: '/staff/courses/edit-trainees',
    STAFF_COURSE_DELETE_ENDPOINT: '/staff/courses/delete',
    // Staff Trainer
    STAFF_TRAINEE_TAKETEN_ENDPOINT: '/staff/trainees/take-ten',
    STAFF_TRAINER_TAKETEN_ENDPOINT: '/staff/trainers/take-ten',
    // Trainer
    TRAINER_COURSE_INDEX_ENDPOINT: '/trainer/courses',
    TRAINER_PROFILE_ENDPOINT: '/trainer/profile',
    // Staff Course Category
    STAFF_COURSE_CATEGORY_INDEX_ENDPOINT: '/staff/courseCategories',
    STAFF_COURSE_CATEGORY_ADD_ENDPOINT: '/staff/courseCategories/add',
    STAFF_COURSE_CATEGORY_EDIT_ENDPOINT: '/staff/courseCategories/edit',
    STAFF_COURSE_CATEGORY_DELETE_ENDPOINT: '/staff/courseCategories/delete',
    // Staff Topic
    STAFF_TOPIC_INDEX_ENDPOINT: '/staff/topics',
    STAFF_TOPIC_ADD_ENDPOINT: '/staff/topics/add',
    STAFF_TOPIC_EDIT_ENDPOINT: '/staff/topics/edit',
    STAFF_TOPIC_EDIT_TRAINER_ENDPOINT: '/staff/topics/edit-trainers',
    STAFF_TOPIC_DELETE_ENDPOINT: '/staff/topics/delete',
    // staff trainer
    STAFF_TRAINER_INDEX_ENDPOINT: '/staff/trainers',
    STAFF_TRAINER_ADD_ENDPOINT: '/staff/trainers/add',
    STAFF_TRAINER_EDIT_ENDPOINT: '/staff/trainers/edit',
    STAFF_TRAINER_DELETE_ENDPOINT: '/staff/trainers/delete',
    // staff trainee
    STAFF_TRAINEE_INDEX_ENDPOINT: '/staff/trainees',
    STAFF_TRAINEE_ADD_ENDPOINT: '/staff/trainees/add',
    STAFF_TRAINEE_EDIT_ENDPOINT: '/staff/trainees/edit',
    STAFF_TRAINEE_DELETE_ENDPOINT: '/staff/trainees/delete',
    // Admin user
    ADMIN_USER_INDEX_ENDPOINT: '/admin/users',
    ADMIN_USER_ADD_ENDPOINT: '/admin/users/add',
    ADMIN_USER_EDIT_ENDPOINT: '/admin/users/edit',
    ADMIN_USER_DELETE_ENDPOINT: '/admin/users/delete',
};

export default BACKEND_URL;