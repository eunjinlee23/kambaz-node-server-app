export default function PathParameters(app) {
    const add = (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    }
    const substract = (req, res) => {
        const { a, b } = req.params;
        const subtraction = parseInt(a) - parseInt(b);
        res.send(subtraction.toString());
    }

    const multiply = (req, res) => {
        const { a, b } = req.params;
        const multiplies = parseInt(a) * parseInt(b);
        res.send(multiplies.toString());
    }

    const divide = (req, res) => {
        const { a, b } = req.params;
        const divides = parseInt(a) / parseInt(b);
        res.send(divides.toString());
    }

    app.get("/lab5/divide/:a/:b", divide);
    app.get("/lab5/multiply/:a/:b", multiply);
    app.get("/lab5/add/:a/:b", add);
    app.get("/lab5/subtract/:a/:b", substract);
}