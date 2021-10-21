import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    header: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: 'green'
    },
    title: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 25,
        margin: 10,
        flex: 1,
        textAlign: 'center',
    },
    gameBoard: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    footer: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: 'green',
    },
    author: {
        color: 'green',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    
    },
    flex: {
        flexDirection: 'row',
    },
    items: {
        padding: 6,
        margin: 5,
    },
    resetBtn: {
        backgroundColor: 'green',
        padding: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    resetBtnTxt: {
        color: 'black',
        fontWeight: 'bold'
    },
    statusTxt: {
        color: 'green',
        marginBottom: 3,
        marginTop: 3,
        fontWeight: 'bold',
    }
});