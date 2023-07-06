import React, { useMemo } from "react";
import { IResponseError } from "../../domain/types/response";
import { convertToViewError } from "../../hooks/utils";

type TProps = {
  resetErrorBoundary?: () => void;
  error: IResponseError;
};

function UnknownError({ resetErrorBoundary, error }: TProps) {
  const retry = useMemo(() => () => resetErrorBoundary?.(), []);

  return (
    <div style={{ padding: "5rem" }}>
      <h1 style={{ fontSize: "5rem", textAlign: "center" }}>😱 앗!</h1>
      <h2>{convertToViewError(error).message}</h2>
      {retry && (
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          <button type="button" onClick={retry}>
            재시도
          </button>
        </p>
      )}
    </div>
  );
}

export default UnknownError;
