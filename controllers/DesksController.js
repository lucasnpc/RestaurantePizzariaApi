

class DesksController {
    async getDesks(req, res) {
        try {
            res.send({
                success: true,
                data: [
                    { id: 1, name: 'Mesa-1' },
                    { id: 1, name: 'Mesa-2' },
                    { id: 1, name: 'Mesa-3' },
                    { id: 1, name: 'Mesa-4' },
                    { id: 1, name: 'Mesa-5' },
                    { id: 1, name: 'Mesa-6' },
                    { id: 1, name: 'Mesa-7' },
                    { id: 1, name: 'Mesa-8' },
                    { id: 1, name: 'Mesa-9' },
                    { id: 1, name: 'Mesa-10' },
                    { id: 1, name: 'Mesa-11' },
                    { id: 1, name: 'Mesa-12' },
                    { id: 1, name: 'Mesa-13' },
                    { id: 1, name: 'Mesa-14' },
                ]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new DesksController();