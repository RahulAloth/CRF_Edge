import React, { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

import PdfInputViewer from "./components/PdfInputViewer";
import OutputPdfViewer from "./components/OutputPdfViewer";
import OutputJsonViewer from "./components/OutputJsonViewer";
import JobStatusPanel from "./components/JobStatusPanel";

import { createJob } from "./api/backend";

export default function App() {

    const [view, setView] = useState("input");

    const [inputPdfFile, setInputPdfFile] =
        useState(null);

    const [filename, setFilename] =
        useState("");

    const [jobId, setJobId] =
        useState(null);

    const [jobStatus, setJobStatus] =
        useState("");

    const [jobMessage, setJobMessage] =
        useState("");

    // ---------------------------------------------------------
    // GENERATE
    // ---------------------------------------------------------

    const handleGenerate = async () => {

        if (!filename) {

            alert(
                "No uploaded filename found!"
            );

            return;
        }

        try {

            const data =
                await createJob(filename);

            setJobId(
                data.job_id
            );

            setJobStatus(
                "processing"
            );

            setJobMessage(
                "Document sent to backend and waiting for results..."
            );

            console.log(
                `[INFO] Job created: ${data.job_id}`
            );

        } catch (err) {

            console.error(
                "Job creation failed:",
                err
            );

            setJobStatus(
                "error"
            );

            setJobMessage(
                "Failed to create processing job."
            );
        }
    };

    // ---------------------------------------------------------
    // REGENERATE
    // ---------------------------------------------------------

    const handleRegenerate = async () => {

        if (!filename) {

            alert(
                "No uploaded filename found!"
            );

            return;
        }

        setJobId(null);
        setJobStatus("");
        setJobMessage("");
        setView("input");

        try {

            const data =
                await createJob(filename);

            setJobId(
                data.job_id
            );

            setJobStatus(
                "processing"
            );

            setJobMessage(
                "Re-processing document..."
            );

        } catch (err) {

            console.error(
                "Re-generation failed:",
                err
            );

            setJobStatus(
                "error"
            );

            setJobMessage(
                "Failed to start regeneration."
            );
        }
    };

    // ---------------------------------------------------------
    // WEBSOCKET
    // ---------------------------------------------------------

    useEffect(() => {

        const ws = new WebSocket(
            `ws://${window.location.hostname}:8000/ws`
        );

        ws.onopen = () => {

            console.log(
                "[WS] Connected"
            );
        };

        ws.onmessage = (event) => {

            try {

                const message =
                    JSON.parse(event.data);

                if (
                    message.type !== "completed"
                ) {

                    return;
                }

                console.log(
                    `[WS] Job completed: ${message.job_id}`
                );

                setJobId(
                    message.job_id
                );

                setJobStatus(
                    "completed"
                );

                setJobMessage(
                    "PDF and JSON received from backend."
                );

                setView(
                    "outputPdf"
                );

            } catch (err) {

                console.error(
                    "[WS] Parse error:",
                    err
                );
            }
        };

        ws.onerror = (err) => {

            console.error(
                "[WS] Error:",
                err
            );
        };

        ws.onclose = () => {

            console.log(
                "[WS] Disconnected"
            );
        };

        return () => {

            ws.close();
        };

    }, []);

    // ---------------------------------------------------------
    // PDF UPLOADED
    // ---------------------------------------------------------

    const handlePdfUploaded = (result) => {

        if (!result.filename) {

            alert(
                "Backend did not return filename!"
            );

            return;
        }

        setFilename(
            result.filename
        );

        console.log(
            `[UPLOAD] ${result.filename}`
        );
    };

    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------

    return (

        <>

            <MainLayout
                onSelectView={setView}
                onGenerate={handleGenerate}
                onRegenerate={handleRegenerate}
                currentView={view}
                setInputPdfFile={setInputPdfFile}
                inputPdfFile={inputPdfFile}
                onPdfUploaded={handlePdfUploaded}
                jobId={jobId}
            >

                {view === "input" && (
                    <PdfInputViewer
                        file={inputPdfFile}
                    />
                )}

                {view === "outputPdf" && (
                    <OutputPdfViewer
                        jobId={jobId}
                    />
                )}

                {view === "outputJson" && (
                    <OutputJsonViewer
                        jobId={jobId}
                    />
                )}

            </MainLayout>

            <JobStatusPanel
                jobId={jobId}
                jobStatus={jobStatus}
                jobMessage={jobMessage}
            />

        </>

    );
}