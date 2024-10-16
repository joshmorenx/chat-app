export async function createNewUser(req: any, res: any) {
    const { userData } = req.body;
    try {
        console.log(userData);
        return res.status(200).json({ msg: "User created" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}