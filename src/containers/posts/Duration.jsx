import { useEffect, useState } from "react";

import moment from "moment";

import PostsText from "../../styles/components/posts/view/PostsText";

const Duration = ({ date }) => {
    const [durate, setDurate] = useState("");

    useEffect(() => {
        moment.locale("ko");

        const createAt = moment(date);
        const now = moment();

        const durationDate = moment.duration(now.diff(createAt));

        // if (durationDate.asYears() >= 1) {
        //     setDurate(Math.floor(durationDate.asYears()) + "년 전");
        // } else if (durationDate.asMonths() >= 1) {
        //     setDurate(Math.floor(durationDate.asMonths()) + "개월 전");
        // } else if (durationDate.asDays() >= 1) {
        //     setDurate(Math.floor(durationDate.asDays()) + "일 전");
        // } else if (durationDate.asHours() >= 1) {
        //     setDurate(Math.floor(durationDate.asHours()) + "시간 전");
        // } else if (durationDate.asMinutes() >= 1) {
        //     setDurate(Math.floor(durationDate.asMinutes()) + "분 전");
        // } else {
        //     setDurate(Math.floor(durationDate.asSeconds()) + "초 전");
        // }

        if (durationDate.asDays() >= 1) {
            setDurate(createAt.format("YYYY-MM-DD"));
        } else {
            if (createAt.isSame(now, "day")) {
                setDurate(createAt.format("HH:mm"));
            } else {
                setDurate(createAt.format("YYYY-MM-DD"));
            }
        }
    }, [date]);

    return <PostsText style={{ marginLeft: "16px" }}>{durate}</PostsText>;
};

export default Duration;
