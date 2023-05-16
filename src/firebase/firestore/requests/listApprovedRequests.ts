import { and, collection, getDocs, query, where } from "firebase/firestore";
import { ApprovedRequestsType } from "../../../types";
import { db } from "../../auth/auth";

export async function listApprovedRequests(
    month: number,
    year: number
): Promise<ApprovedRequestsType[]> {
    console.log("called");
    try {
        const startDate = new Date(year, month - 1, 1);
        console.log(startDate);
        const endDate = new Date(year, month + 2, 0);
        console.log(endDate);
        const queryDb = query(
            collection(db, "approvedRequests"),
            and(
                where("dateEnd", "<=", endDate),
                where("dateEnd", ">=", startDate)
            )
        );

        const querySnapShot = await getDocs(queryDb);

        const approvedReqData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            approverEmail: doc.data().approverEmail,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedByEmail: doc.data().requestedByEmail,
            totalDays: doc.data().totalDays,
            typeOfLeave: doc.data().typeOfLeave,
            holidayTabColour: doc.data().holidayTabColour,
        }));

        return approvedReqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list approved requests from the database");
    }
}
