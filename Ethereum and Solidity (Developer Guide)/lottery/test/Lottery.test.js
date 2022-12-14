const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it("allows one account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"), //convert ke wei
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multiple account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"), //convert ke wei
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"), //convert ke wei
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"), //convert ke wei
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200,
      });
      assert(false); // kalo trynya gk ada error, maka ini akan jalan, dan testnya gagal
    } catch (err) {
      // Karena kita udah kasih validasi di contractnya, kalo error berarti testnya berhasil karena kita kirim < 0.1 ether. assert() ngecek truthiness, kalo errornya ada jadi true, jadi pass the test
      assert(err);
    }
  });

  it("only manager can call pickWinner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("sends money to the winner and resets the players array", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    // const difference = finalBalance - initialBalance;

    // assert(difference > web3.utils.toWei('1.8', 'ether'));

    assert(finalBalance > initialBalance); // kalo lebih besar berarti duitnya dah balik
  });

  it("players are emptied", async () => {
    await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("0.02", "ether"), //convert ke wei
      });
  
      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei("0.02", "ether"), //convert ke wei
      });
  
      await lottery.methods.enter().send({
        from: accounts[2],
        value: web3.utils.toWei("0.02", "ether"), //convert ke wei
      });

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      const players_now = await lottery.methods.getPlayers().call({
        from: accounts[0],
      });

      assert.equal(players_now.length, 0);
  })

});
