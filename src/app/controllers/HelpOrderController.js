import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { unanswered = true, page = 1, requestsPerPage = 20 } = req.query;
    const pagination = {
      order: [['updated_at', 'DESC']],
      limit: requestsPerPage,
      offset: (page - 1) * requestsPerPage,
    };

    const where = { answer: null };
    let helpOrders;

    if (unanswered === 'true') {
      helpOrders = await HelpOrder.findAndCountAll({
        ...pagination,
        where,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });
    } else {
      helpOrders = await HelpOrder.findAndCountAll({
        ...pagination,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });
    }

    return res.json(helpOrders);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { unanswered = true } = req.query;
    let helpOrders;

    if (unanswered === 'true') {
      helpOrders = await HelpOrder.findAll({
        order: [['updated_at', 'DESC']],
        where: {
          answer: null,
          student_id: req.params.student_id,
        },
      });
    } else {
      helpOrders = await HelpOrder.findAll({
        order: [['updated_at', 'DESC']],
        where: {
          student_id: req.params.student_id,
        },
      });
    }

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const newHelpOrder = await HelpOrder.create({
      student_id: req.params.student_id,
      question: req.body.question,
    });

    return res.json(newHelpOrder);
  }
}

export default new HelpOrderController();
