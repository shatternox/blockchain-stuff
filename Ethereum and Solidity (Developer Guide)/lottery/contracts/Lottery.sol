pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;

    function Lottery() public{
        // Langsung dapet address dari yang ngejalanin functionnya
        manager = msg.sender;
    }

    function enter() public payable{
        // require ini buat validasi, kalo false, ntar seluruh funcitonnya exit.
        // msg.value, ngambil nilai gas yang dikirim along with the transaction
        // .01 ether nanti akan diconvert ke wei karena kalo pake wei ntar gk kebaca, 0nya kebanyakan
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    // ini randomnya pseudo-random, randomnya bisa ditebak karena isinya user tau semua
    function random() private view returns (uint){
        // uint convert jadi uint
        return uint(keccak256(block.difficulty, now, players));

    }

    function pickWinner() public restricted{

        uint index = random() % players.length;
        
        // variable address itu sebenernya object, ada methodnya. Transfer untuk transfer duit.
        // this.balance >> nunjuk balance yang ada di contractnya
        players[index].transfer(this.balance);

        // kosongin array playernya lagi, (0) >> artinya initial sizenya 0
        players = new address[](0);

    }

    // bikin function modifier baru, di function lain, biar kita gk pake code yang sama berulang-ulang
    modifier restricted(){
        require(msg.sender == manager);
        _; // ini kyk placeholder
        
        /*
            function yang ada modifier kita, isi functionnya akan secara otomatis pindah ke _; ini. jadinya kyk gini, contohnya function pickWinner

            modifier restricted() {
                require(msg.sender == manager);

                uint index = random() % players.length;
                        
                players[index].transfer(this.balance);

                players = new address[](0);
            }


        */
    }

    function getPlayers() public view returns (address[]){
        return players;
    }


}

