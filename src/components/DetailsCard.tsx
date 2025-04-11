import { StyleSheet, Text, View } from "react-native";

type DetailsCardProps = {
    children?: React.ReactNode,
    backgroundColor: string,
    color: string,
    summary: string,
    style?: object,
}

export default function DetailsCard({children, summary, color='white', backgroundColor='black', style={}}: DetailsCardProps): React.JSX.Element {
    return (
        <View style={[styles.card, style]}>
            <View 
                style={[styles.summaryBox, {backgroundColor: color}]}
            >
              <Text style={[styles.summaryText, {color: backgroundColor}]}>{summary}</Text>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%', 
        display: 'flex', 
        position: 'relative',
        borderWidth: 1, 
        borderColor: 'gray', 
        borderRadius: 10,
        marginTop: 20, 
        padding: 10, 
        paddingTop: 20,
    },  

    summaryBox: {
        position: 'absolute', 
        top: -16, 
        left: 10, 
        paddingHorizontal: 10,
        borderRadius: 1000,
        height: 32, 
        display: 'flex', 
        width: 'auto',
        alignItems: 'center', 
        justifyContent: 'center',
    },

    summaryText: {
        fontSize: 14, 
        fontWeight: '800', 
    }
})