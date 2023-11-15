import s from "./TemplateLayout.module.scss";

export const TemplateLayout = ({
  headerSlot: Header,
  leftSlot: LeftPanel,
  rightSlot: RightPanel,
  children,
}) => {
  return (
    <div className={s.body}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.leftPanel}>
        <LeftPanel />
      </div>
      <div className={s.content}>{children}</div>
      <div className={s.rightPanel}>
        <RightPanel />
      </div>
    </div>
  );
};
