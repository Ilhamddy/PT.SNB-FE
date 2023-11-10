import util from 'node:util'
import nodeChild from "node:child_process"

const pullGit = async (req, res) => {
    const logger = res.locals.logger;
    try{
        const exec = util.promisify(nodeChild.exec);

        async function lsExample() {
            const { stdout, stderr } = await exec('git pull');
            logger.info('stdout:', stdout);
            logger.error('stderr:', stderr);
        }
        lsExample();

        res.status(200).send({
            msg: 'Success',
            code: 200,
            data: "done",
            success: true
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            msg: error.message,
            code: 500,
            data: error,
            success: false
        });
    }
}

export default {
    pullGit
}