import pool from './pool';

pool.on('connect', () => {
    console.log('connected to the database');
});

/**
 *
 */


require('make-runnable');