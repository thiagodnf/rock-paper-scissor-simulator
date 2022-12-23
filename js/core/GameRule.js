class GameRule {

    static ROCK = 0;

    static PAPER = 1;

    static SCISSOR = 2;

    static getWinner(p1, p2) {

        if ((p1 + 1) % 3 == p2) {
            return p2;
        } else if (p1 == p2) {
            // "It is a draw"
            return p1;
        } else {
            return p1;
        }
    }
}
